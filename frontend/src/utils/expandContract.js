export default function expandContract (target, isExpanded, setIsExpanded) {
    if (!isExpanded) {    //EXPAND IT!
        target.style.maxHeight = 'auto'
        // setTimeout(() => {target.style.maxHeight = target.clientHeight}, 500)
        // target.style.maxHeight = 'auto'
        target.classList.remove('unexpanded')
        target.classList.add('expanded')
        setIsExpanded(true)
    }
    else {   //SHRINK IT!
        // target.style.transition = 'max-height 0s'
        // target.style.maxHeight = `${target.clientHeight + 10}px`
        // target.style.transition = 'max-height 55s'
        // target.style.height = '200px'
        target.classList.remove('expanded')
        target.classList.add('unexpanded')
        setIsExpanded(false)
    }
    // scrollTo(target)
}