import type { PDFDocumentProxy } from "pdfjs-dist";
import { Document, Page, pdfjs } from "react-pdf";
import { FC, useState } from "react";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

interface IPDFView {
  file: any;
}
const PDFViewers: FC<IPDFView> = ({ file }) => {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };
  return (
    <div className="max-w-[100%-2em] mx-auto" ref={setContainerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from(new Array(numPages), (_el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
          />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewers;
