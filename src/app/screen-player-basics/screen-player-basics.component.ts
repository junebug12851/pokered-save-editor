import { Component, OnInit } from '@angular/core';

declare var M: any;

@Component({
    selector: 'screen-player-basics',
    templateUrl: './screen-player-basics.component.html',
    styleUrls: ['./screen-player-basics.component.scss']
})
export class ScreenPlayerBasicsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        M.updateTextFields();
    }

}
