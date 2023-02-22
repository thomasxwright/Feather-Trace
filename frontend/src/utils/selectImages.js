import Queue from "./Queue"

export default function selectImages(data, screenMode) {

    let birdTotal = 0
    const enqueuePhotos = data => {
        if (data._id) {
            birdTotal++
            return data.images[0]
        }
        const subItems = Object.values(data)
            .map(subItem => enqueuePhotos(subItem))
        return new Queue(subItems)
    }

    const mineQueueTree = layer => {
        const subItem = layer.dequeue()
        if (!subItem) return undefined
        if (subItem.src) {
            return subItem
        }
        const minedItem = mineQueueTree(subItem)
        if (subItem.length) {
            layer.enqueue(subItem)
        }
        return minedItem
    }

    const queueTree = enqueuePhotos(data)
    const adjustmentKey = {
        narrow: 2.3,
        medium: 1.7,
        desktop: 1
    }
    const adjustment = adjustmentKey[screenMode]
    const multiplier = birdTotal <= (15 / adjustment) ? 1 : Math.log(birdTotal) / Math.log(7 * adjustment)
    let allowance = Math.floor((15 / adjustment) * multiplier)
    if (birdTotal - allowance === 1) allowance++
    const imageCart = []
    while (imageCart.length < allowance && queueTree.length) {
        const nextImage = mineQueueTree(queueTree)
        imageCart.push(nextImage)
    }
    const plusMore = imageCart.length < birdTotal ? birdTotal - imageCart.length : 0

    return {imageCart, birdTotal, plusMore, allowance}
}