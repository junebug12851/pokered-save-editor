/**
   Copyright 2018 June Hanabi

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
/**
 * Adds the pug-loader inside Angular CLI's webpack config, if not there yet.
 * @see https://github.com/danguilherme/ng-cli-pug-loader
 */
const fs = require('fs');
const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';
const pugRule = '{ test: /.pug$/, use: [ { loader: "apply-loader" }, { loader: "pug-loader" } ] },';

fs.readFile(commonCliConfig, (err, data) => {
    if (err) { throw err; }

    const configText = data.toString();
    // make sure we don't add the rule if it already exists
    if (configText.indexOf(pugRule) > -1) { return; }

    // Insert the pug webpack rule
    const position = configText.indexOf('rules: [') + 8;
    const output = [configText.slice(0, position), pugRule, configText.slice(position)].join('');
    const file = fs.openSync(commonCliConfig, 'r+');
    fs.writeFile(file, output, {}, () => {
        fs.close(file, () => { });
    });
});
