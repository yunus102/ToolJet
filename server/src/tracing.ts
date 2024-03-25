import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// SDK
import { NodeSDK } from '@opentelemetry/sdk-node';
// Instrumentation setup
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';

// Collector trace exporter
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

// Tracer provider
const provider = new NodeTracerProvider({
  resource: new Resource({ [SemanticResourceAttributes.SERVICE_NAME]: 'tooljet' }),
});

registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new PgInstrumentation(),
  ],
});

const traceExporter = new OTLPTraceExporter({ url: 'http://localhost:4318/v1/traces' });
provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));
provider.register();

// SDK configuration and start up
export const tracer = new NodeSDK({ traceExporter });

// For local development to stop the tracing using Control+c
process.on('SIGINT', async () => {
  try {
    await tracer.shutdown();
    console.log('Tracing finished.');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
});
