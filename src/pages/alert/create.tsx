import { uid } from 'uid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertElementsList } from '../../components/alert/alert-elements-list/alert-element-list';
import { AlertSettings } from '../../components/alert/alert-settings/alert-settings';
import { Milliseconds, Pixels } from '../../types/types/custom';
import { AlertEditorContainer } from '../../components/alert/alert-editor-container/alert-editor-container';

export const AlertCreate = () => {
  const [settings, setSettings] = useState<{ [x: string]: any }>({
    title: 'Test new alert',
    width: 500,
    height: 500,
    duration: 5000,
  });
  const [elements, setElements] = useState<any[]>([]);
  const { handleSubmit, watch, getValues, control } = useForm();

  const handleDeleteElement = (id: string) => {
    const allElements = [...elements];
    const filterElements = allElements.filter((element) => element.id !== id);
    setElements(filterElements);
  };

  const handleColorChange = (id: string, color: string) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, color };
        }
        return element;
      })
    );
  };

  const handleDurationChange = (id: string, duration: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, duration };
        }
        return element;
      })
    );
  };

  const handleStartChange = (id: string, startTime: Milliseconds) => {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return { ...element, startTime };
        }
        return element;
      })
    );
  };

  useEffect(() => {
    const subscription = watch((value) => setSettings(value));
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  return (
    <div className="p-10 flex gap-10 flex-col">
      <div className="flex gap-10">
        <div className="w-[350px] shrink-0">
          <AlertSettings
            title="New alert"
            control={control}
            addElement={(type) =>
              setElements([
                ...elements,
                {
                  type,
                  title: 'test',
                  id: uid(),
                  color: '#ff0000',
                  duration: 1000,
                  startTime: 2000,
                },
              ])
            }
          />
        </div>
        <div className="flex-1 ">
          <AlertEditorContainer
            width={settings.width}
            height={settings.height}
            elements={elements}
          />
        </div>
      </div>
      <div>
        <AlertElementsList
          elements={elements}
          totalTime={settings.duration}
          onDeleteElement={handleDeleteElement}
          onColorChange={handleColorChange}
          onDurationChange={handleDurationChange}
          onStartChange={handleStartChange}
        />
      </div>
    </div>
  );
};
