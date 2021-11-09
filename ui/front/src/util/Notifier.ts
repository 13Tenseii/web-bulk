declare let Noty: any;

class Notifier {

    private static noty(
        type: 'info' | 'warning' | 'error' | 'success',
        text: string
    ){
        new Noty({
            theme: 'metroui',
            type: type,
            text: text,
            timeout: 10000
        }).show();
    }

    public static info(text: string) {
        this.noty('info', text)
    };

    public static warning(text: string) {
        this.noty('warning', text)
    };

    public static confirm(text: string, buttonName: string, action: Function) {
        let n = new Noty({
            theme: 'metroui',
            type: 'warning',
            text: text,
            timeout: 10000,
            buttons: [
                Noty.button(buttonName, 'btn btn-block btn-light', () => {
                    n.close();
                    action()
                }, {id: 'button1', 'data-status': 'ok'}),
            ]
        }).show();
    };

    public static error(text: string, error?: any) {
        if(error)
            console.error(error);
        this.noty('error', text)
    };

    public static success(text: string): void{
        this.noty('success', text)
    }
}

export default Notifier;