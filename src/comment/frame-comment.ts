import { Comment } from './comment';
import { containsRect } from '../utils';
import { Node, NodeEditor } from 'visualne';
import { NodeView } from 'visualne/types/view/node';

export class FrameComment extends Comment
{
    constructor(text, editor)
    {
        super(text, editor);
        
        this.width = 0;
        this.height = 0;
        this.links = [];
        this.el.className = 'frame-comment';
    }

    linkedNodesView() {
        return this.links
            .map(id => (this.editor as NodeEditor).nodes.find(n => n.id === id))
            .map(node => (this.editor as NodeEditor).view.nodes.get(node as Node));
    }

    onStart() {
        super.onStart();
        this.linkedNodesView().map(nodeView => nodeView?.onStart())
    }

    onTranslate(dx, dy) {
        super.onTranslate(dx, dy);
        this.linkedNodesView().map(nodeView => nodeView?.onDrag(dx, dy))
    }

    isContains(node) {
        const commRect = this.el.getBoundingClientRect();
        const view: NodeView = (this.editor as NodeEditor).view.nodes.get(node) as NodeView;
    
        return containsRect(commRect, view.el.getBoundingClientRect());
    }

    update() {
        super.update();

        this.el.style.width = this.width+'px';
        this.el.style.height = this.height+'px';
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: 'frame',
            width: this.width,
            height: this.height
        }
    }
}
