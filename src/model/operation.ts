enum OperationName {
  grayscale = 'grayscale',
  invert = 'invert',
  brightness = 'brightness',
  contrast = 'contrast',
}

interface Operation {
  name: OperationName;
  config?: any;
}

export { Operation, OperationName }
