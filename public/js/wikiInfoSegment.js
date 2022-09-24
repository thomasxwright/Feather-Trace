export class InfoSegment {
    constructor() {
        this._excludedSegments = [
            'References',
            'Further reading',
            'External links',
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
    set info(info) {
        this._info = info
    }
    
    shouldBeRecorded() {
        return !this.excludedSegments.includes(this.title) && this.info.length
    }

    processInfoSegment() {
        this.info = this.info.map(p => p.replace(/\[[0-9]*\]/g, ''))
    }

    printTidily() {
        console.log(this.title, this.info)
    }
}