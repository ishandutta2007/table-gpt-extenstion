import archiver from 'archiver'
import autoprefixer from 'autoprefixer'
import * as dotenv from 'dotenv'
import esbuild from 'esbuild'
import postcssPlugin from 'esbuild-style-plugin'
import fs from 'fs-extra'
import process from 'node:process'
import tailwindcss from 'tailwindcss'

dotenv.config()

const outdir = 'build'

async function deleteOldDir() {
  await fs.remove(outdir)
}

async function runEsbuild() {
  await esbuild.build({
    entryPoints: [
      'src/content.js',
      'src/background.js',
      'src/options.js',
      'src/popup.js',
    ],
    bundle: true,
    outdir: outdir,
    treeShaking: true,
    // minify: true,
    // drop: ['console', 'debugger'],
    legalComments: 'none',
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.AXIOM_TOKEN': JSON.stringify(process.env.AXIOM_TOKEN || 'UNDEFINED'),
    },
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsx: 'automatic',
    loader: {
      '.png': 'dataurl',
    },
    plugins: [
      postcssPlugin({
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      }),
    ],
  })
}

async function zipFolder(dir) {
  const output = fs.createWriteStream(`${dir}.zip`)
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })
  archive.pipe(output)
  archive.directory(dir, false)
  await archive.finalize()
}

async function copyFiles(entryPoints, targetDir) {
  await fs.ensureDir(targetDir)
  await Promise.all(
    entryPoints.map(async (entryPoint) => {
      await fs.copy(entryPoint.src, `${targetDir}/${entryPoint.dst}`)
    }),
  )
}

async function build() {
  await deleteOldDir()
  await runEsbuild()

  const commonFiles = [
    { src: 'build/content.js', dst: 'content.js' },
    { src: 'build/content.css', dst: 'content.css' },
    { src: 'build/background.js', dst: 'background.js' },
    { src: 'build/options.js', dst: 'options.js' },
    { src: 'build/options.css', dst: 'options.css' },
    { src: 'src/options.html', dst: 'options.html' },
    { src: 'build/popup.js', dst: 'popup.js' },
    { src: 'build/popup.css', dst: 'popup.css' },
    { src: 'src/popup.html', dst: 'popup.html' },
    { src: 'src/logo.png', dst: 'logo.png' },
    { src: 'src/ico16.png', dst: 'ico16.png' },
    { src: 'src/ico19.png', dst: 'ico19.png' },
    { src: 'src/ico32.png', dst: 'ico32.png' },
    { src: 'src/ico38.png', dst: 'ico38.png' },
    { src: 'src/ico48.png', dst: 'ico48.png' },
    { src: 'src/ico128.png', dst: 'ico128.png' },
    { src: 'src/_locales', dst: '_locales' },
  ]

  // chromium
  await copyFiles(
    [...commonFiles, { src: 'src/manifest.json', dst: 'manifest.json' }],
    `./${outdir}/chromium`,
  )

  await zipFolder(`./${outdir}/chromium`)

  // firefox
  await copyFiles(
    [...commonFiles, { src: 'src/manifest.v2.json', dst: 'manifest.json' }],
    `./${outdir}/firefox`,
  )

  await zipFolder(`./${outdir}/firefox`)

  console.log('Build success.')
}

build()
