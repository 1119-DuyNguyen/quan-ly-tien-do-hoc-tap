/**
 * https://api.jquery.com/nextuntil/
 * Get all following siblings of each element up to
 *  but not including the element matched by the selector, DOM node, or jQuery object passed.
 * @param {*} elem
 * @param {*} elements
 * @returns
 */
function nextUntilElement(elem, elements) {
    var siblings = [];
    elem = elem.nextElementSibling;
    while (elem) {
        // Vì con đều là tr nên phải chặn
        if (elements.includes(elem)) break;

        siblings.push(elem);
        elem = elem.nextElementSibling;
    }
    return siblings;
}

/**
 * https://api.jquery.com/nextuntil/
 * Get all following siblings of each element up to
 *  but not including the element matched by the selector, DOM node, or jQuery object passed.
 * @param {Element} elem
 * @param {*} elements
 * @returns
 */
function previousUntilElement(elem, elements) {
    var siblings = [];
    elem = elem.previousElementSibling;
    while (elem) {
        // Vì con đều là tr nên phải chặn
        if (elements.includes(elem)) break;

        siblings.push(elem);
        elem = elem.previousElementSibling;
    }
    return siblings;
}
export class TableTree {
    static styleCss = `
    `;
    static bind(tableEl) {
        let styleEl = document.createElement('style');
        styleEl.innerHTML = TableTree.styleCss;
        if (!tableEl.classList.contains('table-tree')) {
            tableEl.classList.add('table-tree');
        }
        tableEl.appendChild(styleEl);
        /**
         *  Gets all <tr>'s  of greater depth below element in the table
         * @param {Element} tr
         * @returns Get array of element tr
         */
        function findChildren(tr) {
            var depth = tr.dataset.depth;
            var elements = [...tableEl.querySelectorAll('tr[data-depth]')].filter(function (element) {
                return element.dataset.depth <= depth;
            });
            var next = nextUntilElement(tr, elements);
            return next;
        }
        tableEl.querySelectorAll('.toggle').forEach((el) => {
            var tr = el.closest('tr');
            try {
                var depth = Number.parseInt(tr.dataset.depth) + 1;

                let content = '';

                for (let i = 1; i <= depth; ++i) {
                    content += '_';
                }
                el.dataset.depth = content;
            } catch (error) {}

            el.addEventListener('click', (e) => {
                tr = el.closest('tr');
                if (!tr) return;

                var children = findChildren(tr);
                var subnodes = children.filter((element) => {
                    return element.matches('.expand');
                });
                subnodes.forEach((subnode) => {
                    var subnodeChildren = findChildren(subnode);
                    children = children.filter((element) => {
                        return !subnodeChildren.includes(element);
                    });
                    //children = children.not(subnodeChildren);
                });
                //toggle element
                if (tr.classList.contains('collapse')) {
                    tr.classList.remove('collapse');
                    tr.classList.add('expand');
                    children.forEach(function (child) {
                        if (!child.classList.contains('hide')) {
                            child.classList.add('hide');
                        }
                        // child.style.height = '0';
                        // child.style.visibility = 'collapse';
                    });
                } else {
                    tr.classList.remove('expand');
                    tr.classList.add('collapse');
                    children.forEach(function (child) {
                        if (child.classList.contains('hide')) {
                            child.classList.remove('hide');
                        }
                        // child.style.display = '';
                        // child.style.height = '';
                        // child.style.visibility = '';
                    });
                }
            });
        });
    }
}
