/**
 * A plugin targeted at a 2 levels lists DOM to collapse and search the nested lists.
 *
 * Expected html structure is as follows:
 * =======================================
 *
 * <ul id="mylist">
 *     <li class="header">Actors</li>
 *     <ul>
 *         <li>Tom Cruise</li>
 *         <li>Nicolas Cage</li>
 *     </ul>
 *     <li class="header">Producers</li>
 *     <ul>
 *         <li>Steven Spielberg</li>
 *         <li>...</li>
 *     </ul>
 * </ul>
 *
 * Usage with the previous example:
 * ================================
 *
 * $('#mylist').collapsableList('li.header');
 *
 *
 *
 * Author: Sebastien Roch - http://github.com/sebastien-roch
 */
(function ($) {
    $.fn.collapsableList = function (headerSelector, opts) {
        var ESCAPE_KEY = 27;
        var defaults = {
            search: false
        };
        var options = $.extend(defaults, $.fn.collapsableList.defaults, opts);

        // case insensitive "contains" selector
        jQuery.expr[':'].cicontains = function(a,i,m) {
            return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };

        return this.each(function () {
            var headers,
                allElements,
                searchField,
                mainUl = $(this);

            function getHeaders() {
                var headers = mainUl.find('> ' + headerSelector);
                headers.css('cursor', 'pointer');

                return headers;
            }

            function setHeadersClickHandler() {
                headers.on('click', function() {
                    toggleCollapse($(this));
                });
            }

            function hideListElements(liElems) {
                liElems.slideUp();
            }

            function showListElements(liElems) {
                liElems.slideDown();
            }

            function collapseAllHeaders() {
                hideListElements(allElements);
            }

            function expandAllHeaders() {
                showListElements(allElements);
            }

            function collapseHeader(header) {
                hideListElements(findHeadersList(header).find('> li'));
                header.addClass('collapsed');
            }

            function expandHeader(header) {
                showListElements(findHeadersList(header).find('> li'));
                header.removeClass('collapsed');
            }

            function toggleCollapse(header) {
                isHeaderCollapsed(header) ? expandHeader(header) : collapseHeader(header);
            }

            function isHeaderCollapsed(header) {
                return true === header.hasClass('collapsed');
            }

            function findHeadersList(header) {
                return header.next('ul, ol');
            }

            function setSearchField() {
                if (options.search === true) {
                    searchField = $('<input class="collapsable-search"/>');
                } else if (options.search instanceof jQuery) {
                    searchField = $(options.search);
                } else {
                    throw "invalid search option passed: must be true, false or a jQuery object";
                }

                searchField.on('keyup', function(e) {
                    if (e.which === ESCAPE_KEY) {
                        return quitSearch();
                    }
                    doSearch(searchField.val());
                });

                // append the field if it's not already in the DOM
                if (searchField.parents('body').length === 0) {
                    mainUl.prepend(searchField);
                }

                return searchField;
            }

            function quitSearch() {
                searchField.val('');
                doSearch('');
                searchField.blur();
            }

            function isEmptyInput(rawInput) {
                return '' === rawInput;
            }

            function doSearch(input) {
                if (isEmptyInput(input)) {
                    return restoreMainListState();
                }
                hideListElements(allElements.filter(':not(:cicontains(' + input + '))'));
                showListElements(allElements.filter(':cicontains(' + input + ')'));
            }

            function restoreMainListState() {
                headers.each(function() {
                    var header = $(this);
                    if (isHeaderCollapsed(header)) {
                        hideListElements(findHeadersList(header).find('> li'))
                    } else {
                        // hide the list elements that matched the last search
                        showListElements(findHeadersList(header).find('> li'));
                    }
                });
            }

            function setApi() {
                mainUl.data('collapsableList', {
                    collapseAll: collapseAllHeaders,
                    expandAll: expandAllHeaders,
                });
            }

            function init() {
                allElements = mainUl.find('> ul > li, ol > li');
                headers = getHeaders();

                setHeadersClickHandler();
                setApi();
                if (options.search !== false) {
                    setSearchField();
                }
            }

            init();
        });
    };
})(jQuery);