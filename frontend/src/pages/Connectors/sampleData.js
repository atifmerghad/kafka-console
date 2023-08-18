export const headerData = [
  {
    key: 'name',
    header: 'Connector name',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'category',
    header: 'Category',
  },
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'plugin',
    header: 'Plugin name',
  },
  {
    key: 'tasks',
    header: 'Tasks',
  }
];


export const responseConnect =[
  {
    "name": "DatagenSourceConnector_0",
    "status": "PAUSED",
    "category": "Source",
    "plugin": "Datagen",
    "tasks": 6
  },
  {
    "name": "S3SinkConnector_2",
    "status": "RUNNING",
    "category": "Sink",
    "plugin": "S3Sink",
    "tasks": 3
  },
  {
    "name": "S3SourceConnector_3",
    "status": "PAUSED",
    "category": "source",
    "plugin": "S3Source",
    "tasks": 4
  },
  {
    "name": "HttpSinkConnector_1",
    "status": "STOPPED",
    "category": "Sink",
    "plugin": "HttpSink",
    "tasks": 1
  }
]

export const responseConnect_old  = {
  "DatagenSourceConnector_0": {
      "status": {
          "name": "DatagenSourceConnector_0",
          "connector": {
              "state": "PAUSED",
              "worker_id": "DatagenSourceConnector_0",
              "trace": ""
          },
          "tasks": [
              {
                  "id": 0,
                  "state": "STOPPED",
                  "worker_id": "DatagenSourceConnector_0",
                  "msg": ""
              }
          ],
          "type": "source",
          "errors_from_trace": [],
          "validation_errors": [],
          "override_message": ""
      },
      "info": {
          "name": "DatagenSourceConnector_0",
          "type": "source",
          "config": {
              "cloud.environment": "prod",
              "cloud.provider": "aws",
              "connector.class": "DatagenSource",
              "kafka.api.key": "****************",
              "kafka.api.secret": "****************",
              "kafka.auth.mode": "KAFKA_API_KEY",
              "kafka.endpoint": "test123-x123456.us-west-2.aws.glb.confluent.cloud:9092",
              "kafka.region": "us-west-2",
              "kafka.topic": "pageviews",
              "name": "DatagenSourceConnector_0",
              "output.data.format": "JSON",
              "quickstart": "ORDERS",
              "tasks.max": "1"
          },
          "tasks": [
              {
                  "connector": "DatagenSourceConnector_0",
                  "task": 0
              }
          ]
      },
      "id": {
          "id": "lcc-123456",
          "id_type": "ID"
      },
      "extensions": {}
  }
}