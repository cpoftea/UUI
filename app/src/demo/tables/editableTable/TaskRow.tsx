import React, { useRef } from 'react';
import { TimelineGrid, CanvasProps } from '@epam/uui-timeline';
import { Task } from './types';
import { TaskBar } from './TaskBar';

import css from './TaskRow.module.scss';

export interface TaskRowProps extends CanvasProps {
    task: Task;
}

export function TaskRow({ task, timelineController }: TaskRowProps) {
    const taskRowRef = useRef<HTMLDivElement>(null);
    const canvasHeight = 36;
    return (
        <div ref={ taskRowRef } className={ css.taskRow }>
          
            <div
                className={ css.layer }
            >
                <TimelineGrid
                    timelineController={ timelineController }
                    canvasHeight={ canvasHeight }
                    weekendCellColor="rgba(0,0,0,0)"
                    todayLineColor="rgb(0 158 204)"
                    holidayCellColor="blue"
                />
            </div>
            <div
                className={ css.layer }
                onMouseDown={ (e) => timelineController.startDrag(e) }
            >
                <TaskBar task={ task } timelineController={ timelineController } />
            </div>
        </div>
    );
}
