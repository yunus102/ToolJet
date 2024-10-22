import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default function autogenerateColumns(
  tableData,
  existingColumns,
  columnDeletionHistory,
  useDynamicColumn,
  dynamicColumn = [],
  setProperty,
  generateNestedColumns,
  id
) {
  if (useDynamicColumn) {
    if (dynamicColumn.length > 0 && dynamicColumn[0].name) {
      const generatedColumns = dynamicColumn.map((item) => {
        return {
          id: uuidv4(),
          ...item,
          name: item?.name,
          key: item?.key || item?.name,
          autogenerated: true,
        };
      });
      return generatedColumns;
    }
    return [];
  }

  const firstRow = !_.isEmpty(tableData?.[0]) ? tableData?.[0] : {};

  const isValueIsPremitiveOrArray = (value) => {
    if (typeof value !== 'object' || Array.isArray(value)) return true;
  };

  const isValueIsPlainObject = (value) => {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) return true;
  };

  const limitToOneLevelNestingHelperFunc = (data, presentKey) => {
    return Object.entries(data).reduce((accumulator, [key, value]) => {
      if (isValueIsPremitiveOrArray(value)) {
        accumulator.push(`${presentKey}.${key}`);
      }
      return accumulator;
    }, []);
  };
  const generateNestedColumnsHelperFunc = (data, parentKey = '') => {
    return Object.entries(data).reduce((accumulator, [key, value]) => {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      if (isValueIsPlainObject(value)) {
        // if value is object particularly, then we only want nested keys till one level of nesting
        accumulator.push(...limitToOneLevelNestingHelperFunc(value, currentKey));
      } else if (isValueIsPremitiveOrArray(value)) {
        // check if value is premitive or array then simply push current key in the accumulator.
        accumulator.push(currentKey);
      }
      return accumulator;
    }, []);
  };

  const generateColumnKeys = (firstRow, generateNestedColumns) => {
    if (generateNestedColumns) {
      // This block is responsible to get all the keys, nested keys till one level of nesting from the firstRow
      return generateNestedColumnsHelperFunc(firstRow);
    } else {
      /*
        return keys whose value is premitive data type to support backward compatibility for older app,
        where we do not auto-generate column for nested data
      */
      return Object.entries(firstRow).reduce((accumulator, [key, value]) => {
        if (typeof value !== 'object') accumulator.push(key);
        return accumulator;
      }, []);
    }
  };

  // mapping the keys of first row with one level of nested elements.
  const keysOfTableData = generateColumnKeys(firstRow, generateNestedColumns);

  const keysOfExistingColumns = existingColumns.map((column) => column?.key || column?.name);

  const keysFromWhichNewColumnsShouldBeGenerated = _.difference(keysOfTableData, [
    ...keysOfExistingColumns,
    ...columnDeletionHistory,
  ]);

  const keysAndDataTypesToGenerateNewColumns = keysFromWhichNewColumnsShouldBeGenerated?.map((key) => [
    key,
    typeof firstRow[key],
  ]);

  const keysOfExistingColumnsThatNeedToPersist = existingColumns
    .filter((column) => !column?.autogenerated || keysOfTableData.includes(column.key || column.name))
    .map((column) => column?.key || column?.name);

  const generatedColumns = keysAndDataTypesToGenerateNewColumns.map(([key, dataType]) => ({
    id: uuidv4(),
    name: key,
    key: key,
    columnType: convertDataTypeToColumnType(dataType),
    autogenerated: true,
  }));

  const finalKeys = [...keysFromWhichNewColumnsShouldBeGenerated, ...keysOfExistingColumnsThatNeedToPersist];
  const finalColumns = [...existingColumns, ...generatedColumns].filter((column) =>
    finalKeys.includes(column?.key || column?.name)
  );

  setTimeout(() => setProperty(id, 'columns', finalColumns, 'properties'), 10);
}

const dataTypeToColumnTypeMapping = {
  string: 'string',
  number: 'number',
  boolean: 'boolean',
};

const convertDataTypeToColumnType = (dataType) => {
  if (Object.keys(dataTypeToColumnTypeMapping).includes(dataType)) return dataTypeToColumnTypeMapping[dataType];
  else return 'string';
};
