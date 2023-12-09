const THRESHOLD_X = 50;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
};

const debounceWithLeading = (callback, timeoutDelay = 500) => {
  let timeoutId;
  let isLeadingCalled = false;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
      isLeadingCalled = false;
    } else {
      callback.apply(this, args);
      isLeadingCalled = true;
    }

    timeoutId = setTimeout(() => {
      if (!isLeadingCalled) {
        callback.apply(this, args);
      }

      timeoutId = null;
    }, timeoutDelay);
  };
};

const addSwipeHandlers = (swipeSurface, leftSwipeHandler, rightSwipeHandler) => {
  let startX = 0;
  let startY = 0;

  const manageCoordinatesChange = (diffX, diffY) => {
    if (Math.abs(diffX) >= THRESHOLD_X && Math.abs(diffX) >= Math.abs(diffY)) {
      if ((diffX > 0)) {
        rightSwipeHandler();
      } else {
        leftSwipeHandler();
      }
    }
  };

  swipeSurface.addEventListener('mousedown', (evt) => {
    startX = evt.pageX;
    startY = evt.pageY;
  });

  swipeSurface.addEventListener('mouseup', (evt) => {
    const diffX = evt.pageX - startX;
    const diffY = evt.pageY - startY;

    manageCoordinatesChange(diffX, diffY);
  });

  swipeSurface.addEventListener('touchstart', (e) => {
    const touchObject = e.changedTouches[0];

    startX = touchObject.pageX;
    startY = touchObject.pageY;
  }, { passive: true });

  swipeSurface.addEventListener('touchend', (e) => {
    const touchObject = e.changedTouches[0];
    const diffX = touchObject.pageX - startX;
    const diffY = touchObject.pageY - startY;

    manageCoordinatesChange(diffX, diffY);
  });
};

export { debounce, debounceWithLeading, addSwipeHandlers };
