export class InfoSegment {
    constructor() {
        this._excludedSegments = [
            'References',       //exclude
            'Further reading',  //exclude
            'External links',   //grab separately
            'Gallery',          //grab separately
            'Video',
            'Videos',
            'Picture gallery',
            'Image gallery',
            'Citations',
            'Cited sources',
            'Cited books',
            'Cited texts',
            'External sources',
            'Literature cited',
            'Works cited',
            'Literature',
            'Explanatory notes',
            'Line notes',
            'General sources',
            'Study',
            'Notes'
        ]
    }
    get excludedSegments() {
        return this._excludedSegments
    }
    get title() {
        return this._title
    }
    set title(title) {
        this._title = title
    }
    get info() {
        return this._info
    }
    get output() {
        return {title: this.title, info: this.info}
    }
    set info(info) {
        this._info = info
    }

    shouldBeRecorded() {
        return !this.excludedSegments.includes(this.title) && this.info.length
    }
    
    processInfoSegment() {
        //exclude citation superscript segments like [2] or [citation needed]
        this.info = this.info.map(p => p.replace(/\[([0-9]+|citation needed)\]/g, ''))
    }
}