import React, {useState ,useEffect} from 'react';
import { fabric } from "fabric";
import './DesignCanvas.css';

export default function DesignCanvas() {
    const color = [ "#0099ff", "#ff5b5b", "#d3b074", "#9dfb81", "#cf82ff" ];
    const [colorShirt, setColorShirt] = useState<string>("#0099ff");

    const getColor = (color: string) => { 
        setColorShirt(color);
    }

    // const canvas = new fabric.Canvas("canvas-design", {
    //     preserveObjectStacking: true
    // });

    useEffect(() => { 
        const canvas = new fabric.Canvas("canvas-design", {
            preserveObjectStacking: true
        });

        canvas.setDimensions({width: 650, height: 650});

        const list_image = [
            "http://shirt-t.herokuapp.com/img/templates/8.png", 
            "http://shirt-t.herokuapp.com/img/templates/9.png", 
            "https://media.loveitopcdn.com/3807/la-co-viet-nam-vector-1.png", 
            "https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Japan_%28bordered%29.svg", 
            "https://vnconsulate-osaka.org/sites/default/files/inline-images/C%E1%BB%9D%20Vi%E1%BB%87t%20-%20Nh%E1%BA%ADt.jpg"
        ];
        list_image.forEach((item, index) => {
            fabric.Image.fromURL(item, function(image) {
                image.scaleToHeight(90);
                image.scaleToWidth(90); 
                image.set({ left: 20, top: 100*(index + 1), cropX: 0, cropY: 0, borderColor: '#ff0000' });

                canvas.add(image); 
                canvas.renderAll();
            });
        })

    }, [])
    
    return (
        <div className="wrapper">
            <div className="area-canvas">
                <canvas id="canvas-design" width={650} height={650} />
            </div>
            <img 
                src="http://shirt-t.herokuapp.com/img/t-shirts/crew_front.png" 
                alt="t-shirts" 
                style={{
                    backgroundColor: colorShirt
                }}
            />
            <div className="list-color">
                <p>Select Color</p>
                {
                    color.map((item, key) => 
                        <div 
                            data-color={item} 
                            key={key} 
                            onClick={() => getColor(item)} 
                            className="color-item" 
                            style={{
                                backgroundColor: item,
                                width: '30px',
                                height: '30px'
                            }}
                        >
                            { colorShirt === item ? "✓" : "" }
                        </div>
                    )
                }
            </div>
        </div>
    );
}
