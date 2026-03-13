import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    hasAccountId: !!process.env.R2_ACCOUNT_ID,
    hasAccessKeyId: !!process.env.R2_ACCESS_KEY_ID,
    hasSecretAccessKey: !!process.env.R2_SECRET_ACCESS_KEY,
    hasBucketName: !!process.env.R2_BUCKET_NAME,
    accountIdPrefix: process.env.R2_ACCOUNT_ID?.slice(0, 6) ?? "missing",
    bucketName: process.env.R2_BUCKET_NAME ?? "missing",
  };

  try {
    const s3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    const response = await s3.send(
      new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET_NAME! })
    );

    diagnostics.s3Success = true;
    diagnostics.objectCount = response.KeyCount;
    diagnostics.keys = (response.Contents ?? []).map((o) => o.Key);
  } catch (err: unknown) {
    diagnostics.s3Success = false;
    diagnostics.error = err instanceof Error ? err.message : String(err);
    diagnostics.errorName = err instanceof Error ? err.name : "unknown";
  }

  return NextResponse.json(diagnostics);
}
