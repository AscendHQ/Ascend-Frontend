import { InboxOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Link from "next/link";
import React from "react";

import { Container } from "@/components/layout/dashboard";
import { DASHBOARD_LESSON_PLAN } from "@/config/links";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const NewBulkLessonPlan: React.FC = () => (
  <Container headerTitle="New Lesson">
    <main className="px-10 pt-10 pb-36 h-full bg-white">
      <Link
        href={DASHBOARD_LESSON_PLAN}
        className="flex items-center gap-3 mb-3 text-sm"
      >
        <Icon icon="teenyicons:arrow-left-solid" />
        <span>Back</span>
      </Link>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag lessson plan file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading other data aside lessson plan file.
        </p>
      </Dragger>
    </main>
  </Container>
);

export default NewBulkLessonPlan;
