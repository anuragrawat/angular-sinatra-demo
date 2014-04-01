function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x <= y) ? 1 : ((x > y) ? -1 : 0));
    });
}

app.controller("PageController", function ($scope) {
        $scope.pages = JSON.parse(sessionStorage.getItem('pages-arr')) || [];

        $scope.newPage = null;
        $scope.addNewPage = function () {
            if ($scope.newPage != null && $scope.newPage != "") {
                $scope.pages.unshift({
                    id: $scope.pages.length + 1,
                    keywords: $scope.newPage
                });
                sessionStorage.setItem('pages-arr', JSON.stringify($scope.pages));
                $scope.newPage = null;
            }
        }

        $scope.queries = JSON.parse(sessionStorage.getItem('queries-arr')) || [];
        $scope.newQuery = null;
        $scope.addNewQuery = function () {
            if ($scope.newQuery != null && $scope.newQuery != "") {
                var pLen = $scope.pages.length;
                var page_list = [];
                for (var i = 0; i < pLen; i++) {
                    var score = 0;
                    var p = $scope.pages[i];
                    var pArr = p.keywords.split(' ');
                    var qArr = $scope.newQuery.split(' ');
                    for (var j = 0; j < 8; j++) {
                        for (var k = 0; k < 8; k++) {
                            if (pArr[j] != null && qArr[k] != null && (pArr[j].toLowerCase() == qArr[k].toLowerCase())) {
                                score += (8 - j) * (8 - k);
                            }
                        }
                    }
                    page_list.push({id: p.id, score: score});
                }

                page_list = sortByKey(page_list, 'score');
                var pList = [];
                for (var i in page_list) {
                    if (page_list[i].score != 0) {
                        pList.push("P" + page_list[i].id);
                    }
                }

                $scope.queries.unshift({
                    id: $scope.queries.length + 1,
                    keywords: $scope.newQuery,
                    pages: pList.slice(0, 5).toString().replace(/,/g,' ')
                });
                sessionStorage.setItem('queries-arr', JSON.stringify($scope.queries));
                $scope.newQuery = null;

            }
        }


    }
)
;
