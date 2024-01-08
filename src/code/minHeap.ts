export class MinHeap {
  private heap: [number, string][];

  constructor() {
    this.heap = [];
  }

  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private getLeftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  private getRightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private siftUp(): void {
    let nodeIndex = this.heap.length - 1;
    let parentIndex = this.getParentIndex(nodeIndex);
    while (
      nodeIndex > 0 &&
      this.heap[nodeIndex][0] < this.heap[parentIndex][0]
    ) {
      this.swap(nodeIndex, parentIndex);
      nodeIndex = parentIndex;
      parentIndex = this.getParentIndex(nodeIndex);
    }
  }

  private siftDown(): void {
    let nodeIndex = 0;
    let leftChildIndex = this.getLeftChildIndex(nodeIndex);
    let rightChildIndex = this.getRightChildIndex(nodeIndex);
    let smallest = nodeIndex;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex][0] < this.heap[smallest][0]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex][0] < this.heap[smallest][0]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== nodeIndex) {
      this.swap(smallest, nodeIndex);
      nodeIndex = smallest;
      leftChildIndex = this.getLeftChildIndex(nodeIndex);
      rightChildIndex = this.getRightChildIndex(nodeIndex);
      smallest = nodeIndex;
    }
  }

  public push(node: [number, string]): void {
    this.heap.push(node);
    this.siftUp();
  }

  public pop(): [number, string] | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown();
    return root;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }
}
