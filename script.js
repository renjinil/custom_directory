var app = angular.module('myApp',[]);

app.controller('homeController', function homeController($scope) {

    $scope.names = [
    "Cognizant",
        "Tata Consultancy Services",
        "Infosys",
        "Wipro",
        "HCL Technologies",
        "Tech Mahindra",
        "Oracle Financial Services Software",
        "Larsen & Toubro Infotech",
        "Mindtree",
        "Mphasis"
    ];
});

app.directive('custRepeat', function(){
  return {
    transclude : 'element',
    compile : function(element, attr, linker){
      return function($scope, $element, $attr){
        var myLoop = $attr.custRepeat,
            match = myLoop.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
            indexString = match[1],
            collectionString = match[2],
            parent = $element.parent(),
            elements = [];

        // $watchCollection is called everytime the collection is modified
        $scope.$watchCollection(collectionString, function(collection){
          var i, block, childScope;

          // check if elements have already been rendered
          if(elements.length > 0){
            // if so remove them from DOM, and destroy their scope
            for (i = 0; i < elements.length; i++) {
              elements[i].el.remove();
              elements[i].scope.$destroy();
            }
            elements = [];
          }

          for (i = 0; i < collection.length; i++) {
            // create a new scope for every element in the collection.
            childScope = $scope.$new();
            // pass the current element of the collection into that scope
            childScope[indexString] = collection[i];

            linker(childScope, function(clone){
              // clone the transcluded element, passing in the new scope.
              parent.append(clone); // add to DOM
              block = {};
              block.el = clone;
              block.scope = childScope;
              elements.push(block);
            });
          }
        });
      };
    }
  };
});