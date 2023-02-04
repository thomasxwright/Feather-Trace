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

/*

-Load a page, it only shows the filters that are active.
-Change a filter, it adds the "apply changes" button
-X out a filter, it adds the "apply changes" button

-add a filter button --> click -->
    -show all filters
    -don't add new filter --> click -->
        -hide the filters that aren't applied

*/