const RenderIf = ({ condition, ifTrue, ifFalse }) => {
  return condition ? ifTrue : ifFalse;
};

export default RenderIf;
