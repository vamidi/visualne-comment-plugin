import { Node, NodeEditor } from 'visualne';
import { EventsTypes } from 'visualne/types/events';
import { PluginParams } from 'visualne/types/core/plugin';
import { NodeView } from 'visualne/types/view/node';

const min = (arr) => arr.length === 0 ? 0 : Math.min(...arr);
const max = (arr) => arr.length === 0 ? 0 : Math.max(...arr);

export interface CommentEvents extends EventsTypes
{
  commentselected: void,
  commentcreated: void,
  commentremoved: void,
  syncframes: void,
  addcomment: {
    type: 'inline' | 'frame',
    text,
    nodes: Node[],
    position: [number, number],
  },
  removecomment: {
    type: 'inline' | 'frame',
    comment,
  },
  editcomment: {
    text,
    update: Function,
  },
}

export declare type CommentPluginParams = PluginParams & {
  margin?: number,
  disableBuiltInEdit?: boolean,
  frameCommentKeys?: { code: string, shiftKey: boolean, ctrlKey: boolean, altKey: boolean },
  inlineCommentKeys?: {  code: string, shiftKey: boolean, ctrlKey: boolean, altKey: boolean },
  deleteCommentKeys?: {  code: string, shiftKey: boolean, ctrlKey: boolean, altKey: boolean },
};

export function intersectRect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

export function containsRect(r1, r2) {
  return (
    r2.left > r1.left &&
    r2.right < r1.right &&
    r2.top > r1.top &&
    r2.bottom < r1.bottom
  );
}

export function nodesBBox(editor: NodeEditor, nodes: Node[], margin) {
  const left = min(nodes.map(node => node.position[0])) - margin;
  const top = min(nodes.map(node => node.position[1])) - margin;
  const right = max(nodes.map(node => node.position[0] + (editor.view.nodes.get(node) as NodeView).el.clientWidth)) + 2 * margin;
  const bottom = max(nodes.map(node => node.position[1] + (editor.view.nodes.get(node) as NodeView).el.clientHeight)) + 2 * margin;

  return {
    left,
    right,
    top,
    bottom,
    width: Math.abs(left - right),
    height: Math.abs(top - bottom),
    getCenter: () => {
      return [
        (left + right) / 2,
        (top + bottom) / 2
      ];
    }
  };
}
