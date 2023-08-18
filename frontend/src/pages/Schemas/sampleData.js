export const headerData = [
  {
    key: 'subject',
    header: 'Subject',
  },
  {
    key: 'schemaType',
    header: 'Schema type',
  },
  {
    key: 'subject',
    header: 'Current version',
  }
];


export const responseSchemas = [
  {
      "subject": "testingtheschema-value",
      "version": 1,
      "id": 100018,
      "schema": "{\"type\":\"record\",\"name\":\"Employee\",\"namespace\":\"Example\",\"fields\":[{\"name\":\"Name\",\"type\":\"string\"},{\"name\":\"Age\",\"type\":\"int\"}]}"
  },
  {
      "subject": "testingtheschema-value1",
      "version": 1,
      "id": 100148,
      "schema": "{\"type\":\"record\",\"name\":\"EmloyeeTEST\",\"namespace\":\"Exampleschematest\",\"fields\":[{\"name\":\"Name\",\"type\":\"string\"},{\"name\":\"Age\",\"type\":\"int\"}]}"
  },
  {
      "subject": "tests",
      "version": 1,
      "id": 100113,
      "schemaType": "JSON",
      "schema": "{\"type\":\"object\",\"title\":\"record\",\"additionalProperties\":false,\"properties\":{\"firstName\":{\"type\":\"string\"}}}"
  },
  {
      "subject": "version_1",
      "version": 1,
      "id": 100111,
      "schemaType": "JSON",
      "schema": "{\"type\":\"object\",\"title\":\"version_1\",\"additionalProperties\":false,\"properties\":{\"firstName\":{\"type\":\"string\"}}}"
  },
  {
      "subject": "version_2",
      "version": 1,
      "id": 100112,
      "schemaType": "JSON",
      "schema": "{\"type\":\"object\",\"title\":\"version_2\",\"additionalProperties\":false,\"properties\":{\"firstName\":{\"type\":\"string\"},\"age\":{\"type\":\"integer\"},\"contact\":{\"type\":\"string\"}}}"
  }
];