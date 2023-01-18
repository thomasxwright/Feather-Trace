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
            li: TaxonomyGroup or BirdGroup


*/



/* data structure
holding onto this alternate data structure idea, though I dont' think it would be efficient to access.

data: {
    layer: 'order',
    id: 'Passeriformes',
    subItems: [
        {
            layer: 'family',
            id: 'Passeridae',
            subItems: [

            ]
        }
    ]
}


*/