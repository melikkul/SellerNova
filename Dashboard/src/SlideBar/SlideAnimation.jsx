const slideAnimation = {
    initial: { x: "-100%" },
    animate: (isOpen) => ({ x: isOpen ? 0 : "-100%", transition: { type: "spring", stiffness: 100 } })
  };
  
export default slideAnimation;
