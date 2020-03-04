enum FilterName {
  grayscale = 'grayscale',
  invert = 'invert',
  brightness = 'brightness',
  contrast = 'contrast',
}

enum FilterDataType {
  boolean = 'boolean',
  number = 'number',
}

type ValueType = boolean | number;

class Filter {
  name: FilterName;
  type: FilterDataType;
  value?: ValueType;

  constructor(name: FilterName, type: FilterDataType, value?: ValueType){
    this.name = name;
    this.type = type;
    this.value = value;
  }
}

function defaultFilters():Filter[] {
  return [
    new Filter(FilterName.brightness, FilterDataType.number, 0),
    new Filter(FilterName.contrast, FilterDataType.number, 0),
    new Filter(FilterName.invert, FilterDataType.boolean, false),
    new Filter(FilterName.grayscale, FilterDataType.boolean, false),
  ];
}

export { Filter, FilterName, FilterDataType, defaultFilters }
