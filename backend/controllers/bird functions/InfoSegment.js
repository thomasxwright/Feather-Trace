class InfoSegment {
    constructor(title, info) {
        this._title = title
        this._info = info
    }
    get title() {
        return this._title
    }
    get info() {
        return this._info
    }
    get output() {
        return { title: this.title, info: this.info }
    }

    containsThisContent(contentArr) {
        return contentArr.some(contentStr => this.title.toLowerCase().includes(contentStr.toLowerCase()))
    }
}

module.exports = InfoSegment