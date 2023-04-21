import { ServiceIdentifier } from './instantiation'

export const enum TraceType {
    Creation,
    Invocation,
    Branch
}

export class Trace {
    static all = new Set<string>()

    private static readonly _None = new (class extends Trace {
        constructor() {
            super(-1, null)
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        override stop() {}
        override branch() {
            return this
        }
    })()

    static traceInvocation(_enableTracing: boolean, ctor: any): Trace {
        return !_enableTracing
            ? Trace._None
            : new Trace(TraceType.Invocation, ctor.name || new Error().stack!.split('\n').slice(3, 4).join('\n'))
    }

    static traceCreation(_enableTracing: boolean, ctor: any): Trace {
        return !_enableTracing ? Trace._None : new Trace(TraceType.Creation, ctor.name)
    }

    private static _totals = 0
    private readonly _start: number = Date.now()
    private readonly _dep: [ServiceIdentifier<any>, boolean, Trace?][] = []

    private constructor(readonly type: TraceType, readonly name: string | null) {}

    branch(id: ServiceIdentifier<any>, first: boolean): Trace {
        const child = new Trace(TraceType.Branch, id.toString())
        this._dep.push([id, first, child])
        return child
    }

    stop() {
        const dur = Date.now() - this._start
        Trace._totals += dur

        let causedCreation = false

        function printChild(n: number, trace: Trace) {
            const res: string[] = []
            const prefix = new Array(n + 1).join('\t')
            for (const [id, first, child] of trace._dep) {
                if (first && child) {
                    causedCreation = true
                    res.push(`${prefix}CREATES -> ${id}`)
                    const nested = printChild(n + 1, child)
                    if (nested) {
                        res.push(nested)
                    }
                } else {
                    res.push(`${prefix}uses -> ${id}`)
                }
            }
            return res.join('\n')
        }

        const lines = [
            `${this.type === TraceType.Creation ? 'CREATE' : 'CALL'} ${this.name}`,
            `${printChild(1, this)}`,
            `DONE, took ${dur.toFixed(2)}ms (grand total ${Trace._totals.toFixed(2)}ms)`
        ]

        if (dur > 2 || causedCreation) {
            Trace.all.add(lines.join('\n'))
        }
    }
}
