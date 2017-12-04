// Rollup plugins.
import babel from "rollup-plugin-babel"
import cjs from "rollup-plugin-commonjs"
import globals from "rollup-plugin-node-globals"
import replace from "rollup-plugin-replace"
import resolve from "rollup-plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import stylus from "stylus"
import px2rem from "px2rem"

px2rem({})

const preprocessor = (content, id) => new Promise((resolve, reject) => {
    const renderer = stylus(content, {
        filename: id,
        sourcemap: {inline: true}
    })
    renderer.render((err, code) => {
        if (err) {
            return reject(err)
        }
        resolve({code, map: renderer.sourcemap})
    })
})

export default {
    input: "src/index.js",
    output: {
        file: "build/app.js",
        format: "iife"
    },
    plugins: [
        babel({
            babelrc: false,
            exclude: "node_modules/**",
            presets: [ [ "es2015", { modules: false } ], "stage-0", "react" ],
            plugins: [ "external-helpers" ]
        }),
        cjs({
            exclude: "node_modules/process-es6/**",
            include: [
                "node_modules/create-react-class/**",
                "node_modules/fbjs/**",
                "node_modules/object-assign/**",
                "node_modules/react/**",
                "node_modules/react-dom/**",
                "node_modules/prop-types/**"
            ]
        }),
        postcss({
            preprocessor

        }),
        globals(),
        replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
        resolve({
            browser: true,
            main: true
        })
    ],
    sourcemap: true
}
