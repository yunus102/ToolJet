import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const jaegerExporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });
// const consoleExporter = new ConsoleSpanExporter();

// const prometheusExporter = new PrometheusExporter({ port: 9464 });

export const tracer = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'tooljet',
  }),
  spanProcessors: [new SimpleSpanProcessor(jaegerExporter)],
// metricReader: prometheusExporter,
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
