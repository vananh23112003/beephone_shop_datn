import React, { useEffect, useState } from "react";
import { Upload, message, Image, Tooltip } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ImageUploadComponent = ({ setAnhDaiDien, existingImageUrl, hoten }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 170, height: 170 });

  useEffect(() => {
    if (existingImageUrl) {
      setImageUrl(existingImageUrl);
    }
  }, [existingImageUrl]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      message.loading({
        content: "Đang tải ảnh lên...",
        key: "uploading",
      });
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url);
      setAnhDaiDien(info.file.response.url);
      message.success({
        content: "Tải ảnh lên thành công!",
        key: "uploading",
      });
    }
    if (info.file.status === "error") {
      message.error({
        content: "Lỗi tải ảnh lên!",
        key: "uploading",
      });
    }
  };

  const customUploadRequest = async (options) => {
    setTimeout(() => {
      const data = {
        url: "https://example.com/uploaded-image.jpg",
      };
      options.onSuccess(data, options.file);
    }, 2000);
  };

  const customUploadProps = {
    customRequest: customUploadRequest,
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setAnhDaiDien(e.target.result);
        console.log("Image URL length:", e.target.result.length);
      };
      reader.readAsDataURL(file);
      return false;
    },
  };
  const calculateImageSize = (width, height) => {
    const aspectRatio = width / height;
    const maxDimension = 170;

    if (aspectRatio > 1) {
      return { width: maxDimension, height: maxDimension / aspectRatio };
    } else {
      return { width: maxDimension * aspectRatio, height: maxDimension };
    }
  };
  return (
    <div
      style={{
        width: "auto",
        height: "200px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Hiển thị ảnh đã chọn (nếu có) */}
      <div
        style={{
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          border: "1px dashed #ccc",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              ...imageSize,
            }}
            onLoad={(e) => {
              const imgElement = e.target;
              setImageSize(calculateImageSize(imgElement));
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            {hoten ? hoten[0].toUpperCase() : ""}
          </div>
        )}

        {/* Dấu + ở bên dưới cùng bên phải của ảnh */}
        {!imageUrl && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            +
          </div>
        )}
      </div>

      {/* Chọn ảnh từ máy tính cá nhân */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          background: "#3a57e8",
          borderRadius: "100%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 1,
          marginBottom: "32px",
          backgroundColor: "#4b69ff",
          marginRight: "10px",
        }}
      >
        <Tooltip title="Chọn ảnh" color={"black"} placement="bottom">
          <Upload {...customUploadProps} onChange={handleChange}>
            <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
          </Upload>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
