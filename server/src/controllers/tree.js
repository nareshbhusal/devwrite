const render = (item, pos) => {
    // renders the item on position pos
    
}

function rec(C, pos=0) {
    // takes in comment C with replies tree
    render(item, pos);
    // if the C has children 
    if (C.children.length > 0) {
        pos++;
        for (child of C.children) {
            rec(child, pos);
        }
    }
    // if C has no children
    return;
}

rec(C, 0);

// C
    //r
    //r
        //r
            //r
        //r
            //r
    //r
    //r