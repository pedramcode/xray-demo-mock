# xray-demo-mock

This project provides a mock implementation for the XRAY demo, designed to facilitate development and testing without requiring access to the full production environment.

## Features

- Mock services and endpoints for XRAY demo scenarios
- Easy setup for local development and integration testing
- Reuses core modules (`signal` and `rabbit`) from the main XRAY project for consistency

## Getting Started

### Prerequisites

- Node.js (version X or higher)
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/pedramcode/xray-demo-mock.git
cd xray-demo-mock
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Usage

Start the mock server:

```bash
npm start
# or
yarn start
```

The server will start on the default port (e.g., 3000). You can configure the port and other settings via environment variables.

## Project Structure

- `src/` - Main source code for the mock server and services
- `signal/` - Reused module from the main XRAY project for signaling functionality
- `rabbit/` - Reused module from the main XRAY project for RabbitMQ integration

## Reused Modules

This project reuses the following modules from the main XRAY project:

- **signal**: Provides signaling mechanisms for inter-service communication.
- **rabbit**: Handles RabbitMQ messaging and queue management.

Refer to the main XRAY project documentation for details on these modules.
