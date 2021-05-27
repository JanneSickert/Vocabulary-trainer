import tkinter as tk

app = tk.Tk()
app.geometry("1300x1500")

MESSAGE = "Save new Vocabulary"
PATH = "database.js"


def make_js(mystr):
    CODE = ("var cdb = [", "]\n", "var DATA = cdb")
    i = 0
    strGoFile = CODE[0]
    arr = mystr.split("\n")
    while i < (len(arr) - 5):
        strGoFile = strGoFile + "[\"" + arr[i] + "\", \"" + arr[i + 1] + "\"], "
        i = i + 3
    strGoFile = strGoFile + "[\"" + arr[len(arr) - 3] + "\", \"" + arr[len(arr) - 2] + "\"]" + CODE[1] + CODE[2]
    return strGoFile


def write_in_js(mystr):
    PATH = "database.js"
    file = open(PATH, "w")
    file.write(mystr)
    file.close()


def button_action():
    entry_text = textAria.get("1.0", "end")
    write_in_js(make_js(entry_text))


buttonExample1 = tk.Button(app,
                           command=button_action,
                           text=MESSAGE,
                           width=190,
                           height=3
)

textAria = tk.Text(app, height=1000, width=190)

buttonExample1.pack(side=tk.TOP)
textAria.pack(side=tk.BOTTOM)

app.mainloop()