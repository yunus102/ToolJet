import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME, SEMRESATTRS_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Traces
const traceExporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });
// const traceExporter = new ConsoleSpanExporter();

// Metrics
const metricExporter = new OTLPMetricExporter({ url: 'http://localhost:4318/v1/metrics' });
// const metricExporter = new ConsoleMetricExporter();

// Logs
// TODO:
// Add logs exporter when stable support for JS is available. Track here:
// https://github.com/open-telemetry/opentelemetry-js

export const tracer = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'tooljet',
    [SEMRESATTRS_SERVICE_VERSION]: globalThis.TOOLJET_VERSION,
  }),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricExporter,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-nestjs-core': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
    }),
  ],
});

process.on('SIGTERM', () => {
  tracer
    .shutdown()
    .then(
      () => console.log('Tracing terminated successfully'),
      (err) => console.log('Error terminating tracing', err)
    )
    .finally(() => process.exit(0));
});
