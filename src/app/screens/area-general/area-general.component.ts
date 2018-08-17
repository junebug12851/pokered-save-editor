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

import { Component } from '@angular/core';
import { SaveFileService } from "../../data/savefile.service";

@Component({
    selector: 'screen-area-general',
    templateUrl: './area-general.component.pug',
    styleUrls: ['./area-general.component.scss'],
})
export class AreaGeneralComponent {

    constructor(
        public fileService: SaveFileService,
    ) { }

    get contrastImgUrl() {
        const contrast = this.fileService.fileDataExpanded.area.contrast;

        if (contrast == 0)
            return 'assets/pokered-contrast/contrast0.png';

        // 1a and 1b looked the same on the sample image
        // No use in including both identical images
        else if (contrast == 1)
            return 'assets/pokered-contrast/contrast1b.png';
        else if (contrast == 2)
            return 'assets/pokered-contrast/contrast1b.png';

        else if (contrast == 3)
            return 'assets/pokered-contrast/contrast1.png';

        else if (contrast == 4)
            return 'assets/pokered-contrast/contrast2a.png';
        else if (contrast == 5)
            return 'assets/pokered-contrast/contrast2b.png';

        else if (contrast == 6)
            return 'assets/pokered-contrast/contrast2.png';

        // All 3 looked the same on the sample image
        else if (contrast == 7)
            return 'assets/pokered-contrast/contrast3.png';
        else if (contrast == 8)
            return 'assets/pokered-contrast/contrast3.png';
        else if (contrast == 9)
            return 'assets/pokered-contrast/contrast3.png';

        // Default
        return 'assets/pokered-contrast/contrast0.png';
    }
}
