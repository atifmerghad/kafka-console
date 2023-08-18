package com.app.kafka.connectors;

import java.util.List;

public class ConnectorDetails {
    private String name;
    private String connectorClass;
    private List<ConnectorTask> tasks; // You can define the ConnectorTask class as well

    // Constructors, getters, setters

    // Define the ConnectorTask class within ConnectorDetails
    public static class ConnectorTask {
        private String status;
        private String workerId;

        // Constructors, getters, setters
    }
}
