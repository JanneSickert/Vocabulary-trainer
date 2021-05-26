import tkinter as tk

app = tk.Tk()
app.geometry("1300x1500")


def button_action():
    # entry_text = textAria.get()
    print("Button was pressed")


MESSAGE = "Save new Vocabulary"

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