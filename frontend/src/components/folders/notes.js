const activeData =
       species && activeData[order][family][genus][species]
    || genus && activeData[order][family][genus]
    || family && activeData[order][family]
    || order && activeData[order]
    || activeData

for (const subItem in activeData) {
    //gather images
    //count items
}

/*

BirdBrowser
    AccountSection
    SearchTags

    BirdsGlossary
        TaxonomyNavigation
            Taxonomy
        ul
            li: taxonomy or bird


*/