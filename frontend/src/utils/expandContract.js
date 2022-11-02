export default function expandContract (target, isExpanded, setIsExpanded) {
    if (!isExpanded) {    //EXPAND IT!
        target.style.maxHeight = 'none'
        // setTimeout(() => {target.style.maxHeight = target.clientHeight}, 500)
        // target.style.maxHeight = 'auto'
        target.style.overflow = 'visible'

        // target.classList.remove('unexpanded')
        // target.classList.add('expanded')
        setIsExpanded(true)
    }
    else {   //SHRINK IT!
        // target.style.transition = 'max-height 0s'
        // target.style.maxHeight = `${target.clientHeight + 10}px`
        // target.style.transition = 'max-height 55s'
        target.style.maxHeight = '330px'
        target.style.overflow = 'hidden'
        target.style.cursor = 'pointer'
        // target.classList.remove('expanded')
        // target.classList.add('unexpanded')
        setIsExpanded(false)
    }
    // scrollTo(target)
}