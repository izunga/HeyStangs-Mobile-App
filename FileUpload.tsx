import {IconUpload} from "icons";

const FileUpload = () => {
  return (
    <div data-layer="File Upload Section" className="FileUploadSection" style={{
      width: 296,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 12,
      display: 'flex'
    }}>
      <div data-layer="Title"
           className="Title self-stretch justify-start text-[#f2f2f2] text-base font-bold font-['Inter'] leading-snug">File
        Upload
      </div>
      <div data-layer="File Upload" className="FileUpload" style={{
        width: 290,
        height: 130,
        paddingLeft: 29,
        paddingRight: 29,
        paddingTop: 37,
        paddingBottom: 37,
        background: 'white',
        borderRadius: 7,
        outline: '3px #383838 solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        display: 'flex'
      }}>
        <div data-layer="Upload" data-size="20" className="Upload"
             style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
          <div data-layer="Icon" className="Icon" style={{
            width: 15,
            height: 15,
            left: 2.50,
            top: 2.50,
            position: 'absolute',
            outline: '2px #1E1E1E solid',
            outlineOffset: '-1px'
          }}/>
        </div>
        <div data-layer="Text" className="Text" style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
          display: 'flex'
        }}>
          <IconUpload size="20"/>
          <div data-layer="Drag and drop files here" className="DragAndDropFilesHere" style={{
            width: 140,
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: 'black',
            fontSize: 12,
            fontFamily: 'Inter',
            fontWeight: '600',
            wordWrap: 'break-word'
          }}>Drag and drop files here
          </div>
          <div data-layer="or" className="Or" style={{
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: '#8D8D8D',
            fontSize: 10,
            fontFamily: 'Inter',
            fontWeight: '500',
            wordWrap: 'break-word'
          }}>or
          </div>
        </div>

        <button data-layer="Button" data-size="Medium" data-variant="Primary" className="Button"
                style={{
                  width: 100,
                  height: 22,
                  padding: 12,
                  background: '#354CA1',
                  overflow: 'hidden',
                  borderRadius: 5,
                  outline: '1px #243267 solid',
                  outlineOffset: '-1px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 8,
                  display: 'inline-flex'
                }}>
          <div data-layer="Button"
               className="Button text-center justify-center text-neutral-100 text-xs font-semibold font-['Inter'] leading-none flex-nowrap">
            Browse files
          </div>
        </button>
      </div>
    </div>
  );
}