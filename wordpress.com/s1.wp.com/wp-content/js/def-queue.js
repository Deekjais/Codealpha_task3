defQueue = window.defQueue || {
    items: []
};
defQueue.add = function(item) {
    defQueue.items.push(item);
};
defQueue.process = function() {
    defQueue.items.forEach(function(item) {
        if ('function' === typeof item) item();
    });
    defQueue.empty();
};
defQueue.empty = function() {
    defQueue.items = [];
};
defQueue.process();