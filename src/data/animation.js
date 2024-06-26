export const containerVariants = (delay = 0) => ({
  offscreen: {
    opacity: 0,
    x: 10,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 2,
      delay,
    },
  },
});
export const titleVariants = {
  offscreen: {
    opacity: 0,
    y: 30,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2.2,
    },
  },
};

export const desVariants = {
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2.6,
      delay: 0.5,
    },
  },
};

export const tagVariants = {
  offscreen: {
    opacity: 0,
    y: 10,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
};

export const featureVariants = {
  offscreen: {
    scale: 0.5,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 1.2,
    },
  },
};
