import glob

for filepath in glob.glob('/home/kalilinux/Documents/portal/app/**/*.tsx', recursive=True):
    with open(filepath, 'r') as f:
        content = f.read()

    if 'className="bg-slate-50 border-b border-gray-200"' in content:
        # Some files have this duplicate property because we appended it to the first className
        content = content.replace('\n                className="bg-slate-50 border-b border-gray-200"', '')
        content = content.replace('                className="bg-slate-50 border-b border-gray-200"\n', '')
        
        with open(filepath, 'w') as f:
            f.write(content)
