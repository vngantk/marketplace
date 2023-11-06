export function delay(ms: number): Promise<void> {
    return new Promise(resolve => {
        console.log(`Delay for ${ms} ms.`)
        setTimeout(resolve, ms)
    });
}
