"use client";

import {
  Geometry2d,
  HTMLContainer,
  RecordProps,
  Rectangle2d,
  ShapeUtil,
  T,
  TLBaseShape,
  TLResizeInfo,
  resizeBox,
} from "tldraw";
import "tldraw/tldraw.css";

// Định nghĩa kiểu dữ liệu cho custom shape
type MyCustomShape = TLBaseShape<
  "my-custom-shape",
  {
    w: number; // Chiều rộng
    h: number; // Chiều cao
    text: string; // Nội dung văn bản
  }
>;

// Tạo ShapeUtil để định nghĩa hành vi của custom shape
class MyShapeUtil extends ShapeUtil<MyCustomShape> {
  static override type = "my-custom-shape" as const;

  static override props: RecordProps<MyCustomShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
  };

  // Giá trị mặc định của shape
  getDefaultProps(): MyCustomShape["props"] {
    return {
      w: 200,
      h: 100,
      text: "Custom Shape!",
    };
  }

  // Hình dạng vật lý (hitbox)
  getGeometry(shape: MyCustomShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // Hành vi khi thay đổi kích thước
  override onResize(shape: MyCustomShape, info: TLResizeInfo<MyCustomShape>) {
    return resizeBox(shape, info);
  }

  // Cách hiển thị trên canvas
  component(shape: MyCustomShape) {
    return (
      <HTMLContainer style={{ backgroundColor: "#efefef", padding: "10px" }}>
        <div>{shape.props.text}</div>
      </HTMLContainer>
    );
  }

  // Đường viền khi được chọn
  indicator(shape: MyCustomShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

// Xuất array các shape utils để sử dụng
const customShapes = [MyShapeUtil];
export { customShapes };
