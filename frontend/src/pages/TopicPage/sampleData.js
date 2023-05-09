export const rowData = [
  {  
    topicName: "test1_topic",
    partitionCount: 1,
    replicationFactor: 0,
    cleanupPolicy: 11,
    isInternal: false,
    documentation: 11
  },
  {    
    topicName: "test2_topic",
    partitionCount: 2,
    replicationFactor: 0,
    cleanupPolicy: 11,
    isInternal: false,
    documentation: 11
  },
  {
    topicName: "test3_topic",
    partitionCount: 4,
    replicationFactor: 0,
    cleanupPolicy: 11,
    isInternal: false,
    documentation: 11
  }
];

export const headerData = [
  {
    key: 'topicName',
    header: 'Name',
  },
  {
    key: 'partitionCount',
    header: 'Partitions',
  },
  {
    key: 'replicationFactor',
    header: 'Replicas',
  },
  {
    key: 'cleanupPolicy',
    header: 'CleanupPolicy',
  },
  {
    key: 'isInternal',
    header: 'Size',
  },
  {
    key: 'action',
    header: 'Action',
  },
];


export const topicValueDetails = [
  {
    className: 'line-overflow',
    id:"1",
    offset: "1",
    partition: "0",
    timestamp: "2/11/2023, 11:00:51 AM",
    key: "17",
    value: JSON.stringify({
      ordertime:1497014222380,
      orderid:18,
      itemid:"Item_184",
      address:{
      city:"Mountain View",
      state:"CA",
      zipcode:94041
      }
      })
  },
  {
    className: 'line-overflow',
    id:"2",
    offset: "2",
    partition: "1",
    timestamp: "2/11/2023, 11:00:51 AM",
    key: "18",
    value: JSON.stringify({
      ordertime:1497014222380,
      orderid:18,
      itemid:"Item_184",
      address:{
      city:"Mountain View",
      state:"CA",
      zipcode:94041
      }
      })
  },
  {
    className: 'line-overflow',
    id:"3",
    offset: "3",
    partition: "0",
    timestamp: "2/11/2023, 11:00:51 AM",
    key: "19",
    value: JSON.stringify({
      ordertime:1497014222380,
      orderid:18,
      itemid:"Item_184",
      address:{
      city:"Mountain View",
      state:"CA",
      zipcode:94041
      }
      })
  },
  {
    className: 'line-overflow',
    id:"4",
    offset: "4",
    partition: "3",
    timestamp: "2/11/2023, 11:00:51 AM",
    key: "20",
    value: JSON.stringify({
      ordertime:1497014222380,
      orderid:18,
      itemid:"Item_184",
      address:{
      city:"Mountain View",
      state:"CA",
      zipcode:94041
      }
      })
  }
]
export const topicHeaderDetails = [
  {
    key: 'offset',
    header: 'Offset',
  },
  {
    key: 'partition',
    header: 'Partition',
  },
  {
    key: 'timestamp',
    header: 'Timestamp',
    className: 'line-overflow'
  },
  {
    key: 'key',
    header: 'Key'
  },
  {
    key: 'value',
    header: 'Value',
    className: 'line-overflow'
  }
];